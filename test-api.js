const http = require('http');

const testRegister = () => {
  const data = JSON.stringify({
    username: 'testadmin',
    password: 'admin123'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/admin/auth/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      console.log('Response:', body);
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error);
  });

  req.write(data);
  req.end();
};

console.log('Testing register endpoint...');
testRegister();
