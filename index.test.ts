import Gcp from '.'
describe('AppEngine Tests',()=>{
  it('Moudule should loaded',()=>{
    expect(Gcp).toBeTruthy();
  });

  it('Get Instance', async () => {
    const gcp = new Gcp();
    return gcp.getInstance('multi-cloud-resource-creation');
  });
  it('Create Instance', async () => {
    const gcp = new Gcp();
    return gcp.createInstance('multi-cloud-resource-creation');
  });

});