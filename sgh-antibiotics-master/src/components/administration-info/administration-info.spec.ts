import { AdministrationInfoComponent} from './administration-info';

let adminInfo:AdministrationInfoComponent;
describe('Magic 8 Ball Service', () => {

  beforeEach(() => {
    /*adminInfo = new AdministrationInfoComponent(null, null, null, null, null, null,
      null);*/
    /*adminInfo = new AdministrationInfoComponent();*/
    let adminInfo:new (AdministrationInfoComponent) => AdministrationInfoComponent;
  });

  it('should do nothing', () => {

    let result = adminInfo.showMonitoringParameters();
    expect(true).toBeTruthy();

  });

});
