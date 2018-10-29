import { TextAreaAutoSizeDirective } from './textarea-auto-size.directive';

describe('TextareaAutoSizeDirective', () => {
  it('should create an instance', () => {
    const element: any = '';
    const directive = new TextAreaAutoSizeDirective(element);
    expect(directive).toBeTruthy();
  });
});
