import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useAuthContext } from '@/contexts/auth.context.tsx';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const formSchema = z
  .object({
    login: z.string().min(5).max(20),
    password: z.string().min(4),
    passwordRepeat: z.string().min(4),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Passwords are not equal',
    path: ['passwordRepeat'],
  });

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuthContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
      passwordRepeat: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const { login, password } = values;
    register(login, password);
    toast.success('Account created');
    navigate('/login');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
        <Card className="max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your login and password to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              name="login"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="mylogin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="passwordRepeat"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password repeat</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create account</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
