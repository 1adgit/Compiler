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
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/slices/api";
import { handleError } from "@/utils/handleError";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";
const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });
  async function handleLogin(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const response = await login(values).unwrap();
      dispatch(updateCurrentUser(response));
      dispatch(updateIsLoggedIn(true));
      navigate("/");
      // console.log(response);
    } catch (error) {
      handleError(error);
    }
    console.log(values);
  }
  return (
    <div className="__login grid-bg w-full h-[calc(100vh-60px)] flex justify-center items-center gap-3 flex-col">
      <div className="__form_container bg-black border-[1px] py-7 px-7 flex flex-col gap-5 w-[300px]">
        <div className="">
          <h1 className=" font-mono text-4xl font-bold ">Login</h1>
          <p className="font-mono">Welcome back fellow coder</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      disabled={isLoading}
                      placeholder="Username or email"
                      {...field}
                    />
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
                    <Input
                      required
                      disabled={isLoading}
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isLoading} className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
        <small className="text-xs font-mono">
          Dont have an account?
          <Link className="text-blue-500" to="/signup">
            Signup
          </Link>{" "}
        </small>
      </div>
    </div>
  );
};

export default Login;
