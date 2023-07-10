import "./Footer.css"

export default function Footer() {

    // Array of social media elements with name, href, and icon properties
    const socialMediaElements = [
        { name: "Facebook", href: "https://facebook.com", icon: "fa-brands fa-facebook" },
        { name: "Instagram", href: "https://instagram.com", icon: "fa-brands fa-instagram" },
        { name: "Twitter", href: "https://twitter.com", icon: "fa-brands fa-twitter" },
    ];

    return (
        <div className="footer container-fluid">
            <div className="socialMedia">
                {socialMediaElements.map(element => (
                    <span className="icons" key={element.name} onClick={() => window.location.href = element.href}>
                        <i className={`${element.icon}`}></i>
                    </span>
                ))}
            </div>
            <p>The Final Frontier &copy; 2023</p>
        </div>
    )
}