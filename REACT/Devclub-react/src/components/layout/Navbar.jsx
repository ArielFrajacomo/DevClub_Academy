import ThemeToggler from "../ui/ToggleTheme";

export default function Navbar() {
  return (
    <>
    <div className="absolute top-0 w-full h-16 background-color-alt text-primary flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">DevClub - React</h1>
      <ThemeToggler />
    </div>
    </>
  );
}