import moment from "moment";
import React from "react";
import './calendar-tray.scss';

type calendarTrayState = {
  data: string
}

export default class CalendarTrayComponent extends React.Component<{ data: any, onDateClick: any }, calendarTrayState> {
  weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // constructor(props: any) {
  //   super(props);
  // }

  updateMe = (e: any) => {
    this.props.onDateClick(e)
  }

  renderDaysName() {
    return <ul className="weekdays">
      {this.weekDays.map((item) => {
        return <li>
          <span>{item}</span>
        </li>
      })
      }
    </ul>
  }

  renderDates() {

    return <ol className="day-grid">
      {
        [...this.props.data.previousMonthDays, ...this.props.data.currentMonthDays, ...this.props.data.nextMonthDays].map((row: any, i: any) => {
          const slectedDate = this.props.data.selectedDate === row.date ? 'selected-date' : '';
          let result = <li  key={i} onClick={() => this.updateMe(row.date)} className={(row.date) === moment(new Date()).format('YYYY-MM-DD') ? ('today' + ' ' + slectedDate) : ((row.type === 'next' || row.type === 'pre') ? 'out-side' + ' ' + slectedDate : '' + ' ' + slectedDate)}>{moment(new Date(row.date)).format('D')}</li>;
          return result
        })
      }
    </ol>;
  }

  renderHeader() {
    return this.props?.data?.calendarHeader
  }

  render() {
    return (
      <>
        <div className="calendar">
          <header>
            {this.renderHeader()}
          </header>
          {this.renderDaysName()}
          {this.renderDates()}
        </div>
      </>
    )
  }
}