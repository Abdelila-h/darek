"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { darFormSchema } from "@/lib/validator";
import { darDefaultValues } from "@/constant";
import DropDown from "./dropdown";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import ImageUploader from "./image-uploader";
import { FileUploader } from "./FileUploader";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createDar, updateDar } from "@/lib/actions/dar.actions";
import { IDar } from "@/lib/database/models/dar.model";

type DarFormProps = {
  userId: string;
  type: "Create" | "Update";
  dar?: IDar;
  darId?: string;
};

const DarForm = ({ userId, type, dar, darId }: DarFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    dar && type === "Update"
      ? { ...dar, freeDateTime: dar.freeDateTime }
      : darDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");
  // 1. Define your form.
  const form = useForm<z.infer<typeof darFormSchema>>({
    resolver: zodResolver(darFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof darFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newDar = await createDar({
          dar: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newDar) {
          form.reset();
          router.push(`/dars/${newDar._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!darId) {
        router.back();
        return;
      }

      try {
        const updatedDar = await updateDar({
          userId,
          dar: { ...values, imageUrl: uploadedImageUrl, _id: darId },
          path: `/dar/${darId}`,
        });

        if (updatedDar) {
          form.reset();
          router.push(`/dars/${updatedDar._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Dar Title"
                    {...field}
                    className="bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full bg-slate-200">
                <FormControl>
                  <DropDown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="bg-grey-50 flex flex-1 placeholder:text-grey-500 p-regular-16 px-5 py-3 border-none focus-visible:ring-transparent !important rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full bg-slate-400">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Image
                      src="/icons/location.svg"
                      alt="location"
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder="Fin Jaya Dar?"
                      {...field}
                      className="bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="freeDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Image
                      src="/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                    />
                    <p className="ml-3 whitespace-nowrap text-gray-400">
                      Mn Fou9ash dar Khawya?
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      dateFormat="dd/MM/yyyy"
                      className="bg-transparent"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Image
                      src="/icons/price.svg"
                      alt="price"
                      width={24}
                      height={24}
                    />
                    <Input
                      type="number"
                      placeholder="Taman"
                      {...field}
                      className="bg-gray-50 border-0 outline-offset-0 p-regular-16 px-4 py-3 border-none focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Image
                      src="/icons/url.svg"
                      alt="url"
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder="URL"
                      {...field}
                      className="bg-gray-50 border-0 outline-offset-0 p-regular-16 px-4 py-3 border-none focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="rounded-full h-[54px] p-regular-16 col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} DAR`}
        </Button>
      </form>
    </Form>
  );
};

export default DarForm;
