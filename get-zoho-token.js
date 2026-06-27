const fs = require('fs');

async function run() {
  const code = process.argv[2];
  
  if (!code) {
    console.error("\n❌ Error: Please pass the code you copied from the URL bar as an argument!");
    console.error("Example: node get-zoho-token.js 1000.xxxxxxxxx");
    return;
  }
  
  // Read credentials strictly from .env.local
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  const clientIdMatch = envContent.match(/ZOHO_CLIENT_ID=(.*)/);
  const clientSecretMatch = envContent.match(/ZOHO_CLIENT_SECRET=(.*)/);
  
  if (!clientIdMatch || !clientSecretMatch) {
    console.error("❌ Could not find ZOHO_CLIENT_ID or ZOHO_CLIENT_SECRET in .env.local!");
    return;
  }
  
  const client_id = clientIdMatch[1].trim();
  const client_secret = clientSecretMatch[1].trim();
  
  const data = new URLSearchParams();
  data.append("code", code);
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("grant_type", "authorization_code");
  data.append("redirect_uri", "https://api-console.zoho.in");

  console.log("Sending request to Zoho using credentials from .env.local...");

  try {
    const res = await fetch("https://accounts.zoho.in/oauth/v2/token", {
      method: "POST",
      body: data
    });
    
    const json = await res.json();
    console.log("\n📦 Response:", json);
    
    if (json.refresh_token) {
       let updatedEnv = envContent.replace(/ZOHO_REFRESH_TOKEN=.*/, `ZOHO_REFRESH_TOKEN=${json.refresh_token}`);
       fs.writeFileSync('.env.local', updatedEnv);
       console.log("✅ Successfully saved your new Refresh Token to .env.local!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
