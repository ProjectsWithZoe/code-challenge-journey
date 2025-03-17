
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, LogOut, User } from 'lucide-react';
import { getUserProfile, saveUserProfile, clearUserProfile } from '@/lib/localStorage';
import { useToast } from '@/hooks/use-toast';

const AuthButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState(getUserProfile());
  const { toast } = useToast();

  const handleAuth = () => {
    // In a real app, this would connect to betterAuth
    // For now, we'll just simulate login/register with local storage
    if (email && password) {
      const userData = {
        email,
        name: email.split('@')[0],
        id: Date.now().toString()
      };
      
      saveUserProfile(userData);
      setUser(userData);
      setIsOpen(false);
      
      toast({
        title: isRegister ? "Registration Successful" : "Login Successful",
        description: `Welcome ${userData.name}!`,
      });
    }
  };

  const handleLogout = () => {
    clearUserProfile();
    setUser(null);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2">
          <span className="text-sm hidden md:inline">Hi, {user.name}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isRegister ? 'Create Account' : 'Sign In'}</DialogTitle>
              <DialogDescription>
                {isRegister
                  ? 'Create an account to track your progress across devices.'
                  : 'Sign in to sync your progress across devices.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsRegister(!isRegister)}
                className="sm:mr-auto"
              >
                {isRegister ? 'Back to Sign In' : 'Create Account'}
              </Button>
              <Button onClick={handleAuth}>
                {isRegister ? 'Register' : 'Sign In'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AuthButton;
