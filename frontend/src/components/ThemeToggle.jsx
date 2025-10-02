export default function ThemeToggle(){
  function toggle(){
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }
  if (typeof window !== 'undefined') {
    const pref = localStorage.getItem('theme');
    if (pref === 'dark') document.documentElement.classList.add('dark');
  }
  return <button className="btn btn-ghost" onClick={toggle}>Tema</button>;
}
