import { Knex } from 'Knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  //await knex.raw('TRUNCATE TABLE ONLY videos');

  //Insert seed entries
  await knex('videos').insert([
    {
      etag: 'tamwb8xWafaFK3WYUiRjWVPKOCM',
      name: 'a nice video',
      videoId: '_3ngiSxVCBs',
      idkind: 'youtube#video',
      kind: 'youtube#searchResult',
    },
    {
      etag: 'n9DniKGa4RMTCv9hs3aOcxsSzPY',
      name: 'a cool video',
      videoId: '3zTR4ayDG38',
      idkind: 'youtube#video',
      kind: 'youtube#searchResult',
    },
    {
      etag: 'I_vfY1pIPWvk49XZ_WWkBynL88U',
      name: 'a fantastic video',
      videoId: 'aSJUS2tymZA',
      idkind: 'youtube#video',
      kind: 'youtube#searchResult',
    },
    {
      etag: 'fVwysHySGlQcaVwDLkjtP1DDWFk',
      name: 'yet another cool video',
      videoId: '6zEIvZqs0-Y',
      idkind: 'youtube#video',
      kind: 'youtube#searchResult',
    },
    {
      etag: 'lw9CuIh2Zla8HqQdq78u4sTaVIk',
      name: 'encore another video',
      videoId: 'pJuq8D1NGJQ',
      idkind: 'youtube#video',
      kind: 'youtube#searchResult',
    },
  ]);
}
