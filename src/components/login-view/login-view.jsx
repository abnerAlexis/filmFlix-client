export const LoginView = () => {
    return (
        <form>
            <label>
                Username:
                <input type="text" />
            </label>
            <label>
                Passport:
                <input type="passport" />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};