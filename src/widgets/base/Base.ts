import { ConfigType } from '../../vendors/organik';
import { retrieveData, getBehaviorByKey } from '../../utils';

type WidgetBehaviors = { [key: string]: any };

abstract class BaseHeadlessWidget<WidgetProps, CT extends ConfigType = ConfigType> {
  private readonly __widgetProps: WidgetProps;

  private __behaviorKey!: string;

  private __behaviors!: WidgetBehaviors;

  protected getProps(): WidgetProps {
    return this.__widgetProps;
  }

  protected getProp<K extends keyof WidgetProps>(key: K): WidgetProps[K] {
    return this.getProps()[key];
  }

  constructor(props: WidgetProps) {
    this.__widgetProps = props;
  }

  public abstract getConfig(): CT;

  public setBehaviors(keyInTheme: string, options: WidgetBehaviors): void {
    this.__behaviorKey = keyInTheme;
    this.__behaviors = options;
  }

  public getBehavior(path: string): any {
    return getBehaviorByKey(`${this.__behaviorKey}.${path}`, retrieveData(this.__behaviors, path));
  }

  public getCommonBehavior(path: string, defaultBehavior?: any): any {
    return getBehaviorByKey(`common.${path}`, defaultBehavior);
  }
}

export { BaseHeadlessWidget };
