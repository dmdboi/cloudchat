# cloud-chat

Cloudflare-based chat application that connects you to other people using the same Cloudflare datacenter.

## Explanation

This application uses Cloudflare's global edge network to create location-based chat rooms. When a user visits the site, their requests are automatically routed through the nearest Cloudflare datacenter (for example, LHR for London, UK). As a result, users in the same geographic region (and thus the same Cloudflare datacenter) are grouped together, enabling real-time, local chat experiences based on where their traffic enters the Cloudflare network.

It's like proximity chat but for the web!

## Example

If you're based in the UK, your Cloudflare datacenter is likely to be in London. If you connect to the chat, you'll be able to chat with other people who are also connected to the London datacenter.

## Usage

Sign up with a username and password, you'll automatically be assigned to a datacenter based on the request sent to Cloudflare. You can then chat with other users in the same datacenter.

## Development

To run the application locally, you'll need to create a D1 database either locally or on Cloudflare, then run `npx wrangler dev` to start the development server.

## Deployment

Run `npx wrangler deploy` to deploy the application to Cloudflare Workers. Make sure you have your D1 database configured in your `wrangler.toml` file.
