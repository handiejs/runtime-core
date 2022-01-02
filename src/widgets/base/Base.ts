import { DataValue, ConfigType, ViewContext } from '../../vendors/organik';
import { retrieveData, getBehaviorByKey } from '../../utils';

type WidgetBehaviors = { [key: string]: any };

abstract class BaseHeadlessWidget<WidgetProps, CT extends ConfigType = ConfigType> {
  private readonly __widgetProps: WidgetProps;
  private readonly __viewContext: ViewContext;

  private __behaviorKey!: string;
  private __behaviors!: WidgetBehaviors;

  protected getProps(): WidgetProps {
    return this.__widgetProps;
  }

  protected getProp<K extends keyof WidgetProps>(key: K): WidgetProps[K] {
    return this.getProps()[key];
  }

  protected getViewContext<V extends ViewContext = ViewContext>(): V {
    return this.__viewContext as V;
  }

  constructor(props: WidgetProps, viewContext: ViewContext) {
    this.__widgetProps = props;
    this.__viewContext = viewContext;
  }

  public abstract getConfig(): CT;

  public setBehaviors(keyInTheme: string, options: WidgetBehaviors): void {
    this.__behaviorKey = keyInTheme;
    this.__behaviors = options;
  }

  public getBehavior(path: string): DataValue {
    return getBehaviorByKey(`${this.__behaviorKey}.${path}`, retrieveData(this.__behaviors, path));
  }

  public getCommonBehavior(path: string, defaultBehavior?: DataValue): DataValue {
    return getBehaviorByKey(`common.${path}`, defaultBehavior);
  }
}

export { BaseHeadlessWidget };
