import { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR, { useSWRConfig } from 'swr'

const fetcher = url => fetch(url).then(r => r.json());
const url = '/api/texts';

function MessageList(props) {
  const { messages } = props;
  return (
    <ul>
      {messages.map(msg => (
        <li key={msg.id}><b>{msg.reporter}:</b> - {msg.text}</li>
      ))}
    </ul>
  );

}

function NewMessageForm() {
  const [text, setText] = useState('');
  const [reporter, setReporter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { mutate } = useSWRConfig()

  async function handleSubmit(e) {
    setSubmitting(true);
    e.preventDefault();
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ reporter, text }),
      contentType: 'application/json',
    });

    setSubmitting(false);
    setText('');
    setReporter('');
    mutate(url);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Reporter
        <input type="text" value={reporter} onChange={(e) => setReporter(e.target.value)} />
      </label>

      <label>
        Text
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
      </label>

      <input type="submit" value="Report" disabled={submitting} />
    </form>
  );
}

export default function Home() {
  const { data, error } = useSWR(url, fetcher);

  if (error) {
    return <span>{JSON.stringify(error)}</span>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Newsroom</title>
        <meta name="description" content="Everyone is a reporter" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Latest News
        </h2>

        <NewMessageForm />
        <MessageList messages={data || []} />
      </main>
    </div>
  )
}
