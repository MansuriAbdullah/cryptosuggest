import fetch from 'node-fetch';

async function testSubmit() {
    try {
        const response = await fetch('http://localhost:5000/api/websites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Website ' + Math.random(),
                url: 'https://test.com',
                email: 'test@test.com',
                category: 'Crypto Exchanges',
                shortDescription: 'This is a test description.',
                role: 'founder'
            })
        });
        
        const data = await response.json();
        console.log(data);
    } catch (e) {
        console.error(e);
    }
}
testSubmit();
