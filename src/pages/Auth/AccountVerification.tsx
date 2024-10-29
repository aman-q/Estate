import { GetServerSideProps } from 'next';
import AccountVerification from '../../components/AccountVerification';

interface AccountVerificationPageProps {
    email: string;
    type: 'verify-email' | 'forgot-password';
}

const accountVerificationPage: React.FC<AccountVerificationPageProps> = ({ email, type }) => {
    return <AccountVerification email={email} type={type} />;
};

export const getServerSideProps: GetServerSideProps<AccountVerificationPageProps> = async (context) => {
    const { email, type } = context.query;

    if (typeof email !== 'string' || (typeof type !== 'string' && type !== undefined)) {
        return {
            notFound: true, // or handle errors as needed
        };
    }

    const verificationType: 'verify-email' | 'forgot-password' = type as 'verify-email' | 'forgot-password' || 'verify-email';

    return {
        props: {
            email,
            type: verificationType,
        },
    };
};

export default accountVerificationPage;
