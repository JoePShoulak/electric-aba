const EmailInput = props => (
  <input type="email" placeholder="Email" name="email" {...props} />
);

const UsernameInput = props => (
  <input type="text" placeholder="Username" name="username" {...props} />
);

const PasswordInput = props => (
  <input type="password" placeholder="Password" name="password" {...props} />
);

const PasswordConfirmInput = props => (
  <input
    type="password"
    placeholder="Confirm Password"
    name="confirmPassword"
    {...props}
  />
);

export { EmailInput, UsernameInput, PasswordInput, PasswordConfirmInput };
