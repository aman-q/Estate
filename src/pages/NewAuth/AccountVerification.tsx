import { GetServerSideProps } from 'next';
import VerifyAccount from './VerifyAccount';
import ForgetPasswordVerify from './ForgetPasswordVerity';

interface AccountVerificationPageProps {
    email: string;
    type: 'verify-email' | 'forgot-password';
}

const AccountVerificationPage: React.FC<AccountVerificationPageProps> = ({ email, type }) => {
    // Conditionally render based on the type prop
    if (type === 'forgot-password') {
        return <ForgetPasswordVerify email={email} type={type} />;
    }

    return <VerifyAccount email={email} type={type} />;
};

export const getServerSideProps: GetServerSideProps<AccountVerificationPageProps> = async (context) => {
    const { email, type } = context.query;

    if (typeof email !== 'string' || (typeof type !== 'string' && type !== undefined)) {
        return {
            notFound: true, // or handle errors as needed
        };
    }

    // Ensure that the type is either 'verify-email' or 'forgot-password'
    const verificationType: 'verify-email' | 'forgot-password' = type as 'verify-email' | 'forgot-password' || 'verify-email';

    return {
        props: {
            email,
            type: verificationType,
        },
    };
};

export default AccountVerificationPage;
