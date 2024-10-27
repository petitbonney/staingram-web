const LoginInput = ({ icon, type, placeholder }) => {
  return (
    <label className="input input-bordered flex items-center gap-2 mb-1 bg-gray-50 !outline-none">
      {icon}
      <input type={type} className="grow" placeholder={placeholder} />
    </label>
  );
};

export default LoginInput;
