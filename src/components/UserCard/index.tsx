function UserCard({ name, phone, companyName }: IUserCardProps) {
    return (
        <div>
            <p>Name: {name}</p>
            <p>Phone: {phone}</p>
            <p>Company: {companyName}</p>
        </div>
    );
};

export default UserCard

interface IUserCardProps {
    name: string,
    phone: string,
    companyName: string,
};
