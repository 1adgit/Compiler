import "./pageStyles/grid.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});
const Signup = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  function handleSignup(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="__signup grid-bg w-full h-[calc(100vh-60px)] flex justify-center items-center gap-3 flex-col">
      <div className="__form_container bg-black border-[1px] py-7 px-7 flex flex-col gap-5 w-[300px]">
        <div className="">
          <h1 className="font-mono text-4xl font-bold ">Signup</h1>
          <p className="font-mono">Welcome to the community of fellow coders</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
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
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
        <small className="text-xs font-mono">
          Already have an account?
          <Link className="text-blue-500" to="/login">
            Login
          </Link>{" "}
        </small>
      </div>
    </div>
  );
};
export default Signup;
