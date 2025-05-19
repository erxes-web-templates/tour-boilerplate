"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CURRENT_USER } from "@/app/auth/_graphql/queries";

// GraphQL mutation
const EDIT_USER = gql`
  mutation ClientPortalUsersEdit($id: String!, $clientPortalId: String, $phone: String, $email: String, $firstName: String, $lastName: String) {
    clientPortalUsersEdit(_id: $id, clientPortalId: $clientPortalId, phone: $phone, email: $email, firstName: $firstName, lastName: $lastName) {
      _id
    }
  }
`;

const formSchema = z.object({
  id: z.string().min(1, "ID is required"),
  clientPortalId: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type UserFormValues = z.infer<typeof formSchema>;

interface UserEditDialogProps {
  user?: {
    _id: string;
    clientPortalId?: string;
    phone?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  };
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export function UserEditDialog({ user, onSuccess, trigger }: UserEditDialogProps) {
  const [open, setOpen] = useState(false);

  // Initialize the form with default values
  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user?._id || "",
      clientPortalId: user?.clientPortalId || "",
      phone: user?.phone || "",
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
  });

  // Set up the mutation
  const [editUser, { loading }] = useMutation(EDIT_USER, {
    onCompleted: () => {
      toast("User updated successfully");
      setOpen(false);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast("Error updating user: " + error.message);
    },
    refetchQueries: [
      {
        query: CURRENT_USER,
      },
    ],
  });

  // Handle form submission
  function onSubmit(values: UserFormValues) {
    editUser({
      variables: {
        id: values.id,
        clientPortalId: values.clientPortalId || undefined,
        phone: values.phone || undefined,
        email: values.email || undefined,
        firstName: values.firstName || undefined,
        lastName: values.lastName || undefined,
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || <Button variant="outline">Edit User</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>{`Make changes to the user profile here. Click save when you're done.`}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email address" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <input type="hidden" {...form.register("id")} />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
