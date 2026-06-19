import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';

export const SignupPage = () => {
  return (
    <div>
      <div>
        <h1>Register now</h1>
        <p>Welcome! Sign up to continue</p>
        <div>
          <Input />
          <Input />
        </div>
        <div>
          <Button />
          <Button />
        </div>
      </div>
    </div>
  );
};
