// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { z } from "zod";
// import { formSchema } from "../lib/Schema";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { createTBT } from "../lib/actions";
// import { useActionState } from "react";

// const initialState = { message: "" };

// export default function LinkGenerator() {
//   const [state, formAction] = useActionState(createTBT, initialState);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       secretKey: "",
//       publicKey: "",
//       environment: "development",
//     },
//   });

//   // const handleSubmit = async (data: z.infer<typeof formSchema>) => {
//   //   // setIsLoading(true);
//   //   const formData = new FormData();
//   //   formData.append("secretKey", data.secretKey);
//   //   formData.append("publicKey", data.publicKey);
//   //   formData.append("environment", data.environment);

//   //   // setIsLoading(false);

//   //   // if (result?.url) {
//   //   //   setUrl(result.url);
//   // };

//   return (
//     <Form {...form}>
//       <Card>
//         <CardHeader>
//           <CardTitle>
//             <Image
//               className="dark:invert"
//               src="/assets/logo.svg"
//               alt="Next.js logo"
//               width={100}
//               height={20}
//               priority
//             />
//           </CardTitle>
//           <CardDescription>
//             Create a safepay checkout link by adding the credentials.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form
//             // onSubmit={form.handleSubmit(handleSubmit)}
//             action={formAction}
//             className="space-y-4"
//           >
//             <FormField
//               control={form.control}
//               name="secretKey"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Secret Key" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="environment"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Envoirnment</FormLabel>
//                   <FormControl>
//                     <RadioGroup
//                       defaultValue={"development"}
//                       onValueChange={field.onChange}
//                     >
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="development" id="option-one" />
//                         <Label htmlFor="option-one">Development</Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="sandbox" id="option-two" />
//                         <Label htmlFor="option-two">Sandbox</Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="production" id="option-three" />
//                         <Label htmlFor="option-three">Production</Label>
//                       </div>
//                     </RadioGroup>
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <Button variant="submit" type="submit">
//               Submit
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </Form>
//   );
// }
