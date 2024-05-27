"use client";

import * as React from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Category, Post } from "@prisma/client";
import { deletePostAction } from "@/app/(dashboard)/posts/actions/delete-post-action";
import { Loader } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { EditForm } from "@/app/(dashboard)/posts/edit-form";

type PostTableActionsProps = {
  post: Post;
  categories: Category[];
};

export function PostTableActions({ post, categories }: PostTableActionsProps) {
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleDeletePost = () => {
    startTransition(() => {
      deletePostAction(post.id).then(() => {
        setShowDeleteDialog(false);
        toast({
          description: "This post has been deleted."
        });
      });
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span className="sr-only">Actions</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isDesktop ? (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Edit {post.title}</DialogTitle>
              <DialogDescription>
                Make changes to post here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <EditForm
              post={post}
              close={() => setShowEditDialog(false)}
              categories={categories}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Edit {post.title}</DrawerTitle>
              <DrawerDescription>
                Make changes to post here. Click save when you&apos;re done.
              </DrawerDescription>
            </DrawerHeader>
            <EditForm className="px-4" post={post} categories={categories} />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This post will no longer be
              accessible by you or others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleDeletePost}
            >
              {isPending ? (
                <Loader className="animate-spin" size="sm" />
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
