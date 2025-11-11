const http = require('http');

// Test 1: Transaksi dengan data pelanggan manual (TIDAK disimpan)
const testTransaksiManualTanpaSimpan = () => {
  console.log('\n=== Test 1: Transaksi dengan pelanggan manual (tidak disimpan) ===');
  
  const data = JSON.stringify({
    nama_pelanggan: "John Doe",
    no_telp_pelanggan: "08123456789",
    simpan_pelanggan: false,
    tanggal_masuk: "2025-11-10",
    tanggal_selesai: "2025-11-12",
    pembayaran_awal: 25000,
    pembayaran_status: "DP",
    status: "Pending",
    detail: [
      {
        layanan_id: 1,
        berat: 3
      },
      {
        layanan_id: 2,
        berat: 2
      }
    ]
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/transaksi',
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
      console.log('Response:', JSON.stringify(JSON.parse(body), null, 2));
      
      // Lanjut ke test 2 setelah test 1 selesai
      setTimeout(testTransaksiManualDenganSimpan, 1000);
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error);
  });

  req.write(data);
  req.end();
};

// Test 2: Transaksi dengan data pelanggan manual (DISIMPAN ke database)
const testTransaksiManualDenganSimpan = () => {
  console.log('\n=== Test 2: Transaksi dengan pelanggan manual (disimpan ke database) ===');
  
  const data = JSON.stringify({
    nama_pelanggan: "Jane Smith",
    no_telp_pelanggan: "08987654321",
    simpan_pelanggan: true,
    tanggal_masuk: "2025-11-10",
    tanggal_selesai: "2025-11-13",
    pembayaran_awal: 50000,
    pembayaran_status: "DP",
    status: "Pending",
    detail: [
      {
        layanan_id: 1,
        berat: 5
      }
    ]
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/transaksi',
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
      console.log('Response:', JSON.stringify(JSON.parse(body), null, 2));
      
      // Lanjut ke test 3 setelah test 2 selesai
      setTimeout(testTransaksiPelangganExisting, 1000);
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error);
  });

  req.write(data);
  req.end();
};

// Test 3: Transaksi dengan pelanggan_id yang sudah ada
const testTransaksiPelangganExisting = () => {
  console.log('\n=== Test 3: Transaksi dengan pelanggan_id existing ===');
  
  const data = JSON.stringify({
    pelanggan_id: 1,
    tanggal_masuk: "2025-11-10",
    tanggal_selesai: "2025-11-14",
    pembayaran_awal: 30000,
    pembayaran_status: "DP",
    status: "Pending",
    detail: [
      {
        layanan_id: 1,
        berat: 4
      }
    ]
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/transaksi',
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
      console.log('Response:', JSON.stringify(JSON.parse(body), null, 2));
      console.log('\n=== Semua test selesai ===');
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error);
  });

  req.write(data);
  req.end();
};

// Mulai test
console.log('Testing transaksi dengan pelanggan manual...');
testTransaksiManualTanpaSimpan();
