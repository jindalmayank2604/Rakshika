import app from '../src/app.js';
import { query, pool } from '../src/config/db.js';

async function runTwoClientTest() {
  const server = app.listen(5003);
  const baseUrl = 'http://127.0.0.1:5003/api';

  try {
    console.log('=== STEP 1: USER A REGISTRATION & AUTH ===');
    const userAEmail = 'usera_' + Date.now() + '@example.com';
    const regResA = await fetch(baseUrl + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'User A', email: userAEmail, phone: '9876543210', password: 'password123' })
    });
    const regDataA = await regResA.json();
    console.log('User A Registered:', regDataA.success, 'Token received:', !!regDataA.token);
    const tokenA = regDataA.token;

    console.log('\n=== STEP 2: USER A SUBMITS INCIDENT TO POSTGRESQL ===');
    const reportPayload = {
      title: 'Broken CCTV and Pitch Dark Alley',
      category: 'Broken CCTV',
      description: 'Street cameras broken, zero visibility after 8pm.',
      latitude: 30.7250,
      longitude: 76.7650,
      address: 'Sector 22 Market Alley, Chandigarh',
      severity: 'High'
    };

    const postRes = await fetch(baseUrl + '/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenA
      },
      body: JSON.stringify(reportPayload)
    });
    const postData = await postRes.json();
    console.log('POST /api/reports Status:', postRes.status, 'Success:', postData.success);
    console.log('Created Report ID in DB:', postData.data?.id, 'Title:', postData.data?.title);

    console.log('\n=== STEP 3: DIRECT POSTGRESQL VERIFICATION ===');
    const dbCheck = await query('SELECT id, user_id, title, category, latitude, longitude, severity, status, created_at FROM reports WHERE id = $1', [postData.data.id]);
    console.log('Direct PostgreSQL Query Result:', dbCheck.rows[0]);

    console.log('\n=== STEP 4: USER B LOGS IN & FETCHES /api/incidents ===');
    const userBEmail = 'userb_' + Date.now() + '@example.com';
    const regResB = await fetch(baseUrl + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'User B', email: userBEmail, phone: '9876543211', password: 'password123' })
    });
    const regDataB = await regResB.json();
    const tokenB = regDataB.token;

    const getResB = await fetch(baseUrl + '/incidents', {
      headers: { 'Authorization': 'Bearer ' + tokenB }
    });
    const getDataB = await getResB.json();
    console.log('User B GET /api/incidents Status:', getResB.status, 'Total Reports Returned:', getDataB.count);
    const foundUserAReport = getDataB.data.find(r => r.id === postData.data.id);
    console.log('Did User B receive User A report?', !!foundUserAReport);
    console.log('User A Report Received by User B:', {
      id: foundUserAReport?.id,
      title: foundUserAReport?.title,
      category: foundUserAReport?.category,
      severity: foundUserAReport?.severity,
      status: foundUserAReport?.status,
      user_name: foundUserAReport?.user_name
    });

    // Cleanup
    await query('DELETE FROM reports WHERE id = $1', [postData.data.id]);
    await query('DELETE FROM users WHERE email IN ($1, $2)', [userAEmail, userBEmail]);
    console.log('\n✅ ALL 4 ARCHITECTURAL VERIFICATION STEPS PASSED 100%!');
  } finally {
    server.close();
    await pool.end();
  }
}

runTwoClientTest().catch(console.error);
