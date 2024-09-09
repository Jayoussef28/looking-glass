import { Button } from 'react-bootstrap';

function Home() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <p>Click the button below to create a profile!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn">
        Create Profile
      </Button>

    </div>
  );
}

export default Home;
