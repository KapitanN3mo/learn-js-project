function Profile() {
    return (
        <img
            src="https://react.dev/images/docs/scientists/MK3eW3As.jpg"
            alt="Katherine Johnson"
        />
    );
}

export default function Gallery() {
    return (
        <div>
            <h1>Amazing scientists</h1>
            <Profile />
            <Profile />
            <Profile />
        </div>
    );
}