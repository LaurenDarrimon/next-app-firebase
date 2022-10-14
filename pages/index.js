import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/layout.js';

import styles from '../styles/Home.module.css'

import { getFriendList } from '../lib/friends.js';

export async function getStaticProps() {

  const allPeopleArray  = await getFriendList();

      // list.sort(function(a, b){
    //     return a.name.localeCompare(b.name);
    // });


  const allPeople = JSON.stringify(allPeopleArray)

  // console.log("friend data on home page")
  // console.log(allPeople)

  return {
      props: {
          allPeople
      }
  };
}

export default function Home({ allPeople }) {

  let allPeopleList = JSON.parse(allPeople); 

  console.log("friend data on home page")
  console.log(allPeopleList)

  return (
    <Layout home>
      <h1 className={styles.title}>
        Welcome to Middle Earth Socials
      </h1>

      <p className={styles.description}>
        Virtual gathering for all the free peoples of middle earth.
      </p>

      <h2>Find Hobbits, Dwarves, Elves, Men, Wizards, and more!</h2>

      <div className="list-group">
        {allPeopleList ?
            allPeopleList.map(({ id, data}) => (
              <Link  key={id} href={`friends/${id}`}>
                <a className="list-group-item list-group-item-action"> {data.name} </a> 
              </Link>
            ))
        : null }
      </div>
    </Layout>
  )
}
