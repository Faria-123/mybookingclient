// // import React from 'react';

// import Card from "@/components/Card";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// const page = async () => {
//     const session = await auth.api.getSession({
//         headers: await headers(),
//     });
//     const user = session?.user;
//     const email = user?.email;
//     const res = await fetch(`http://localhost:8000/allbook/${email}`);
//     const data = await res.json();
//     console.log(data);
//     return (
//         <div>
//             {
//                 data.map((book) => <Card book={book} key={book._id}></Card>)
//             }
//         </div>
//     );
// };

// export default page; 

import Card from "@/components/Card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";

const MyBooks = async () => {
    await connection();

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    const res = await fetch(
        `http://localhost:8000/allbook/${encodeURIComponent(user.email)}`,
        { cache: "no-store" }
    );

    const data = await res.json();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((book) => (
                <Card book={book} key={book._id} />
            ))}
        </div>
    );
};

const Page = () => {
    return (
        <Suspense fallback={<p>Loading your books...</p>}>
            <MyBooks />
        </Suspense>
    );
};

export default Page;
