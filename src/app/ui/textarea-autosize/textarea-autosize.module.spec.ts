import { TextareaAutosizeModule } from './textarea-autosize.module';

describe('TextareaAutosizeModule', () => {
  let textareaAutosizeModule: TextareaAutosizeModule;

  beforeEach(() => {
    textareaAutosizeModule = new TextareaAutosizeModule();
  });

  it('should create an instance', () => {
    expect(textareaAutosizeModule).toBeTruthy();
  });
});
