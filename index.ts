import { google, appengine_v1, } from 'googleapis';

class Gcp {
  appengine: appengine_v1.Appengine;
  constructor(keyFile?: string | undefined) {
    if (keyFile === undefined && process.env.GOOGLE_APPLICATION_CREDENTIALS === undefined) {
      throw Error("Credentials required");
    } else if (keyFile === undefined) {
      keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS ? process.env.GOOGLE_APPLICATION_CREDENTIALS : "";
    }
    console.log(keyFile);
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFile,
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    this.appengine = google.appengine({ auth: auth, version: "v1" });
  }
  async createInstance(projectId:string) {
    try {
      const resp = await this.appengine.apps.create({requestBody:{
        id:projectId,
        locationId:'us-central'
      }});
      console.log(resp.data);
      return resp;
    } catch (error) {
      console.log(error.response);
      console.log(error.response.data);
      throw error;
    }

  }

  async getInstance(projectId: string) {
    try {
      const resp = await this.appengine.apps.get({ appsId: projectId });
      console.log(resp);
      return resp;
    } catch (error) {
      console.log(error.response.data);
      throw error;
    }

  }
}

export default Gcp;