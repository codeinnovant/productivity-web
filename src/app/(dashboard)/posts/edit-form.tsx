import { editPostAction } from "@/app/(dashboard)/posts/actions/edit-post-action";
import { CategoryPicker } from "@/components/category-picker";
import { Info } from "@/components/info";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { EditPostForm, editPostSchema } from "@/lib/validators/post";
import { Category, Post } from "@prisma/client";
import { Loader } from "lucide-react";
import { useTransition } from "react";

type EditFormProps = {
  post: Post;
  close?: () => void;
  className?: string;
  categories: Category[];
};

export function EditForm({
  post,
  close,
  className,
  categories
}: EditFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useZodForm({
    schema: editPostSchema,
    defaultValues: {
      title: post.title,
      content: post.content || "",
      categoryId: post.categoryId,
      published: post.published
    }
  });

  const handleEditPost = async (data: EditPostForm) => {
    startTransition(() => {
      editPostAction(post.id, data).then(() => {
        form.reset();
        if (close) close();
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleEditPost)}
        className={cn("space-y-2", className)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter title</FormLabel>
              <FormControl>
                <Input placeholder="My title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter content</FormLabel>
              <FormControl>
                <Textarea placeholder="My content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Checkbox
                    onCheckedChange={checked => field.onChange(checked)}
                    checked={field.value}
                  />
                  <div className="flex items-center">
                    <Label>Published</Label>
                    <Info
                      information="When true, this post will be visible to the public."
                      className="ml-2 inline-block"
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose cateogry</FormLabel>
              <FormControl>
                <CategoryPicker
                  value={field.value}
                  setValue={field.onChange}
                  categories={categories}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button
            variant="outline"
            onClick={e => {
              e.preventDefault();
              close && close();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isPending ? (
              <Loader className="animate-spin" size="sm" />
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
