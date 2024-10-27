export const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto py-4">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Header</h1>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
