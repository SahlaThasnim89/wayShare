const Footer = () => {
    return (
      <div className="bg-slate-900 text-slate-300 px-56">
        <div className="flex flex-row justify-between py-16 border-5/8">
          <ul className="flex flex-col list-none">
            <li className="font-semibold my-4 text-slate-400">SERVICES</li>
            <li>Branding</li>
            <li>Design</li>
            <li>Marketing</li>
            <li>Advertising</li>
          </ul>
          <ul className="flex flex-col list-none">
            <li className="font-bold my-4 text-slate-400">COMPANY</li>
            <li>About us</li>
            <li>Contact</li>
            <li>Press Kit</li>
            <li>Jobs</li>
          </ul>
          <ul className="flex flex-col list-none">
            <li className="font-bold my-4 text-slate-400">LEGAL</li>
            <li>Terms of use</li>
            <li>Privacy policy</li>
            <li>Cookie policy</li>
          </ul>
        </div>
        <div className="border-t border-slate-500 py-4">
          <h1 className="text-2xl">WayShare</h1>
          <p>Copyright © 2024 - All right reserved by WayShare</p>
        </div>
      </div>
    );
  };
  
  export default Footer;
  