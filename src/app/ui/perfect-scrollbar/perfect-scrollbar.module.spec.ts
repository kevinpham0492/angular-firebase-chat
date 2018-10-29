import { PerfectScrollbarModule } from './perfect-scrollbar.module';

describe('PerfectScrollbarModule', () => {
  let perfectScrollbarModule: PerfectScrollbarModule;

  beforeEach(() => {
    perfectScrollbarModule = new PerfectScrollbarModule();
  });

  it('should create an instance', () => {
    expect(perfectScrollbarModule).toBeTruthy();
  });
});
