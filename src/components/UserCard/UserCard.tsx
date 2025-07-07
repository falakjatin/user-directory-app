interface IUserCardProps {
    name: string,
    phone: string,
    companyName: string,
};

function UserCard({ name, phone, companyName }: IUserCardProps) {
    return (
        <div className="user-card">
            <h3 className="user-name">{name}</h3>
            <a className="phone-button" href={`tel:${phone}`}>
                <svg className="phone-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-.586 1.414L7.414 9.414a16 16 0 006.172 6.172l.707-.707A2 2 0 0115 13h2a2 2 0 012 2v2a2 2 0 01-2 2h-1c-7.18 0-13-5.82-13-13V5z" />
                </svg>

                {phone}
            </a>
            <p className="company-name">{companyName}</p>
        </div>
    );
};

export default UserCard;
