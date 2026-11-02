import React, { Suspense } from 'react';
import ResetPassForm from './ResetPassForm';

const page = () => {
    return (
        <div>
            from reset password
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPassForm></ResetPassForm>
            </Suspense>
        </div>
    );
};

export default page;