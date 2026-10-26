import {afterEach,expect,it,vi} from 'vitest';
import {fetchText} from '../../scripts/verify/lib/fetch.mjs';

afterEach(()=>vi.unstubAllGlobals());

it('rejects image and other non-text responses instead of hashing binary bytes as pricing',async()=>{
  for(const contentType of ['image/png','application/pdf','application/octet-stream']){
    vi.stubGlobal('fetch',async()=>new Response('PNG binary bytes with accidental Free plan words'.repeat(30),{headers:{'content-type':contentType}}));
    expect(await fetchText('https://example.com/pricing')).toMatchObject({status:200,text:'',accessIssue:'non-text'});
  }
});

it('retains readable HTML and JSON source text',async()=>{
  for(const contentType of ['text/html; charset=utf-8','application/json']){
    vi.stubGlobal('fetch',async()=>new Response('Free plan includes 5 GB',{headers:{'content-type':contentType}}));
    expect(await fetchText('https://example.com/pricing')).toMatchObject({status:200,text:'Free plan includes 5 GB'});
  }
});

it('asks for English so localized sites do not switch language between scans',async()=>{
  let headers:Headers|undefined;
  vi.stubGlobal('fetch',async(_url:string,init:RequestInit)=>{headers=new Headers(init.headers);return new Response('Free plan includes 5 GB',{headers:{'content-type':'text/html'}});});
  await fetchText('https://example.com/pricing');
  expect(headers?.get('accept-language')).toBe('en-US,en;q=0.9');
});
