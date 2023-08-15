import { Fragment } from 'react';
import { Head } from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A first Meetup',
//         image: 'https://images.unsplash.com/photo-1569878766010-17bff0a1987d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
//         address: 'Some Street 5, 1234 Some City',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm2',
//         title: 'A second Meetup',
//         image: 'https://images.unsplash.com/photo-1569878766010-17bff0a1987d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
//         address: 'Some Street 5, 1234 Some City',
//         description: 'This is a second meetup!'
//     },
// ];

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name='description'
                    content='Browse a huge list of highly active React meetups!'
                ></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>

    );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     //fetch data from API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    // fetch data from API
    const client = await MongoClient.connect('mongodb+srv://dali-admin:Test1234._@cluster1.mfkv9tt.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        }
    };
}



export default HomePage;