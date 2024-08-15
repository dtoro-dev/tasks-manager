import { Component, OnInit } from "@angular/core";
import { ITaskChartAnnually, ITaskChartHistory, ITaskCount } from "src/app/interfaces/task.interface";
import IPriority from "src/app/models/priority.model";
import { DashboardService } from "src/app/services/dashboard.service";
import { ProrityService } from "src/app/services/prority.service";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  currentYear = new Date().getFullYear();
  taskCount?: ITaskCount;
  priority: IPriority[] = [];
  colorDefault: string = "#1f2937";
  optionsChartAnnually: echarts.EChartsOption = {};
  optionsChartHistory: echarts.EChartsOption = {};

  constructor(
    private TaskService: TaskService,
    private ProrityService: ProrityService,
    private DashboardService: DashboardService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      let flag = await this.TaskService.getTaskCount();

      if (flag) {
        let priority = this.ProrityService.getPriorities();

        this.taskCount = flag;
        this.priority = priority;
      }
    } catch (error) {
      console.error("Error fetching task count", error);
    }

    this.chargeChartAnnually();
    this.chargeChartHistory();

  }

  chargeChartAnnually() {
    const labelOption: echarts.BarSeriesOption["label"] = {
      show: true,
      distance: 15,
      align: "left", // Ensure this is of type 'HorizontalAlign'
      verticalAlign: "middle", // Ensure this is of type 'VerticalAlign'
      rotate: 90,
      formatter: "{c}  {name|{a}}",
      fontSize: 9,
      rich: {
        name: {},
      },
      color: "#fff",
    };

    const dataAnnually: ITaskChartAnnually = this.DashboardService.getChartAnnually()

    this.optionsChartAnnually = {
      title: {
        text: `Actividad ${this.currentYear}`,
        top: 20,
        left: "center",
        textStyle: {
          color: "#fff",
          fontSize: 24,
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      legend: {
        data: ["Pendientes", "En Proceso", "Finalizados", "Vencidos"],
        textStyle: {
          color: "#fff",
          position: "insideBottom",
        },
        bottom: 0,
        left: "center",
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar", "stack"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
        textStyle: {
          color: "#fff",
        }
      },
      xAxis: {
        type: "category",
        axisLabel: { color: "#fff" },
        axisTick: { show: false },
        data: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#fff" },
      },
      series: [
        {
          name: "Pendientes",
          type: "bar",
          barGap: 0,
          // label: labelOption,
          emphasis: { focus: "series" },
          data: dataAnnually.pendings,
          itemStyle: {
            color: '#008cff',
          }
        },
        {
          name: "En Proceso",
          type: "bar",
          // label: labelOption,
          emphasis: { focus: "series" },
          data: dataAnnually.inProgress,
          itemStyle: {
            color: '#f4b400',
          }
        },
        {
          name: "Finalizados",
          type: "bar",
          // label: labelOption,
          emphasis: { focus: "series" },
          data: dataAnnually.completed,
          itemStyle: {
            color: '#0f9d58',
          }
        },
        {
          name: "Vencidos",
          type: "bar",
          // label: labelOption,
          emphasis: { focus: "series" },
          data: dataAnnually.overdue,
          itemStyle: {
            color: '#db4437',
          }
        },
      ],
    };
  }

  chargeChartHistory() {
    const labelOption: echarts.BarSeriesOption["label"] = {
      show: true,
      distance: 15,
      align: "center",
      verticalAlign: "middle",
      rotate: 0,
      formatter: "{c}",
      fontSize: 20,
      rich: {
        name: {},
      },
      color: "#fff",
    };

    const dataHistory: ITaskChartHistory = this.DashboardService.getChartHistory()

    this.optionsChartHistory = {
      title: {
        text: `Actividad Histórica`,
        top: 20,
        left: "center",
        textStyle: {
          color: "#fff",
          fontSize: 24,
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      legend: {
        data: ["Pendientes", "En Proceso", "Finalizados", "Vencidos"],
        textStyle: {
          color: "#fff",
          position: "insideBottom",
        },
        bottom: 0,
        left: "center",
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar", "stack"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
        textStyle: {
          color: "#fff",
        }
      },
      xAxis: {
        type: "category",
        axisLabel: { color: "#fff" },
        axisTick: { show: false },
        data: dataHistory.years,
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#fff" },
      },
      series: [
        {
          name: "Pendientes",
          type: "bar",
          barGap: 0,
          label: labelOption,
          emphasis: { focus: "series" },
          data: dataHistory.pendings,
          itemStyle: {
            color: '#008cff',
          }
        },
        {
          name: "En Proceso",
          type: "bar",
          label: labelOption,
          emphasis: { focus: "series" },
          data: dataHistory.inProgress,
          itemStyle: {
            color: '#f4b400',
          }
        },
        {
          name: "Finalizados",
          type: "bar",
          label: labelOption,
          emphasis: { focus: "series" },
          data: dataHistory.completed,
          itemStyle: {
            color: '#0f9d58',
          }
        },
        {
          name: "Vencidos",
          type: "bar",
          label: labelOption,
          emphasis: { focus: "series" },
          data: dataHistory.overdue,
          itemStyle: {
            color: '#db4437',
          }
        },
      ],
    };
  }
}
