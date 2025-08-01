function Footer() {
  return (
    <footer className="w-full bg-card dark:bg-background border-t border-border shadow-inner">
      <div className="max-w-6xl mx-auto p-3 sm:p-4 text-center text-xs sm:text-sm text-muted-foreground">
        © {new Date().getFullYear()} QuickMind. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
