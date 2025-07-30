function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-800 shadow-inner">
      <div className="max-w-6xl mx-auto p-4 text-center text-sm text-gray-800 dark:text-gray-300">
        © {new Date().getFullYear()} QuickMind. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
