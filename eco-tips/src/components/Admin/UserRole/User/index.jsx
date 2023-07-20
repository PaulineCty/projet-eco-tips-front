/* eslint-disable max-len */
// modules
import moment from 'moment';
// Components
import Button from '@/components/Tools/ButtonTemplate';

function User({firstname, lastname, email, birthdate, ecocoins, score, role}) {

    const handleValidation = () => {
        setModalText('Êtes-vous sûr de vouloir modifier cet utilisateur ?');
        setCurentColorButton('blue');
        setCurrentAction('validate');
        setOnShowModalState(true);
    };

    return (
        <div>
            <div>
                <p>{firstname} {lastname}</p>
                <p>Email: {email}</p>
                <p>Date de naissance: {moment.utc(birthdate).format('DD/MM/YYYY')}</p>
                <p>Role: {role}</p>
            </div>
            <Button
                type="button"
                color="blue"
                padding="p-1"
                onClick={handleValidation}
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
        </Button>
        </div>
    );
}

export default User;
