import React from "react";
import moment from 'moment';
import CalendarTrayComponent from "./calendar-tray/calendar-tray";

type IProps = {
    isViewTypeMonth: boolean
}

type IState = {
    currentDate: any;
    currentMonth: any;
    currentYear: any;
    currentMonthDays: any;
    previousMonthDays: any;
    nextMonthDays: any;
    isLoaded: any;
    isViewTypeMonth: boolean;
    calendarHeader: string;
    selectedDate: string;
}


export default class CalendarComponent extends React.Component<IProps, IState> {
    dateFormate_YYYYMMDD: string ="YYYY-MM-DD";
    // constructor(props: any) {
    //     super(props);

    // }

    componentWillMount() {
        this.setState({ isViewTypeMonth: this.props.isViewTypeMonth ,
            selectedDate: moment(new Date()).format(this.dateFormate_YYYYMMDD)       
        });
        this.props.isViewTypeMonth ? this.bindCalendarData(new Date()) : this.getWeekDates(new Date());
    }

    // After the component did mount, we set the state.
    componentDidMount() {       
    }

    today = () => {
        this.setState({currentDate: new Date(),  selectedDate: moment(new Date()).format(this.dateFormate_YYYYMMDD) });
        setTimeout(() => { this.state?.isViewTypeMonth ? this.bindCalendarData(new Date()) : this.getWeekDates(new Date()) },200)
    }

    gotoBack = () => {
        let nMD = moment(this.state.currentDate).add(-1, this.state.isViewTypeMonth?'months': 'weeks').toDate();
        this.setState({ currentDate: nMD });
        this.state.isViewTypeMonth ? this.bindCalendarData(nMD) : this.getWeekDates(nMD) ;
    }

    gotoNext = () => {
        let nMD = moment(this.state.currentDate).add(1, this.state.isViewTypeMonth?'months': 'weeks').toDate();
        this.setState({currentDate: nMD});
        this.state.isViewTypeMonth ? this.bindCalendarData(nMD) : this.getWeekDates(nMD) ;
    }

    getWeekDates = (date: any) => {
        let currentDate = moment(date);
      
        let weekStart = currentDate.clone().startOf('isoWeek');
        let weekEnd = currentDate.clone().endOf('isoWeek');

        let currentMonth = weekStart.format('MMMM');
        let currentYear = weekStart.format('YYYY');

        let startDate = weekStart.format('MMM, DD YYYY');
        let endDate = weekEnd.format('MMM, DD YYYY');
      
        let days = [];
        let currentMonthDays: any = [];
        let dates = this.getDatesBetweenTwoDates(weekStart, weekEnd);
        for (let i: any = 0; i < dates.length; i++) {
            currentMonthDays.push({ type: 'current', date: dates[i] })
        }
        this.setState({
            isLoaded: true, currentMonth: currentMonth, currentYear: currentYear, currentMonthDays: currentMonthDays,
            previousMonthDays: [], nextMonthDays: [],
            calendarHeader: (startDate+ ' - ' + endDate)
        });
      }

    bindCalendarData = (date: any) => {
        let currentDate = date;
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

        let previousMonthDate = moment(date).add(-1, 'months').toDate();

        let nextMonthDate = moment(date).add(1, 'months').toDate();

        let previousMonthDays: any = []
        let nextMonthDays: any = []
        let currentMonthDays: any = [];
        this.appendPreviousMonthDates(previousMonthDays, previousMonthDate);

        this.appendCurrentMonthDates(currentMonthDays, currentDate)

        this.appendNextMonthDates(nextMonthDays, nextMonthDate);

        this.setState({
            isLoaded: true, currentMonth: currentMonth, currentYear: currentYear, currentMonthDays: currentMonthDays,
            previousMonthDays: previousMonthDays, nextMonthDays: nextMonthDays,
            calendarHeader: moment(date).format('MMMM YYYY')
        });
    }

    appendCurrentMonthDates = (currentMonthDays: any = [], currentDate: any) => {
        let start = moment(currentDate).startOf('month').startOf('day').toDate();
        let end = moment(currentDate).endOf('month').endOf('day').toDate()
        let dates = this.getDatesBetweenTwoDates(start, end);
        for (let i: any = 0; i < dates.length; i++) {
            currentMonthDays.push({ type: 'current', date: dates[i] })
        }
    }

    appendPreviousMonthDates = (previousMonthDays: any = [], previousMonthDate: any) => {
        let start = moment(previousMonthDate).endOf('month').startOf('isoWeek').toDate();
        let end = moment(previousMonthDate).endOf('month').endOf('day').toDate()
        let dates = this.getDatesBetweenTwoDates(start, end);
        for (let i: any = 0; i < dates.length; i++) {
            previousMonthDays.push({ type: 'pre', date: dates[i] })
        }
    }

    appendNextMonthDates = (nextMonthDays: any = [], nextMonthDate: any) => {
        let start = moment(nextMonthDate).startOf('month').startOf('day').toDate();
        let end = moment(nextMonthDate).startOf('month').endOf('isoWeek').toDate();
        let dates = this.getDatesBetweenTwoDates(start, end);
        for (let i: any = 0; i < dates.length; i++) {
            nextMonthDays.push({ type: 'next', date: dates[i] })
        }
    }

    getDatesBetweenTwoDates = (startDate: any, stopDate: any) => {
        let dateArray = [];
        let ctDate = moment(startDate);
        let sDate = moment(stopDate);
        while (ctDate <= sDate) {
            dateArray.push(moment(ctDate).format(this.dateFormate_YYYYMMDD))
            ctDate = moment(ctDate).add(1, 'days');
        }
        return dateArray;
    }

    toggleMonthView = () =>{
        let viewType = this.state.isViewTypeMonth;
        this.setState({isViewTypeMonth: !viewType, currentDate: new Date()});
        setTimeout(() => {
            this.state?.isViewTypeMonth ? this.bindCalendarData(new Date()) : this.getWeekDates(new Date())
        }, 200);
        
    }

    updateSelectedDate = (e:any) =>{
        this.setState({selectedDate: e});
    }

    render() {
        return (
            <>
                <div className="card" >
                    <div className="card-header">
                    <button className="btn btn-warning btn-sm" onClick={this.toggleMonthView}>{this.state?.isViewTypeMonth?'Switch Week View':'Switch Month View'}</button>
                        <div className="text-right flot-right hand">
                            <button className="previous round" onClick={this.gotoBack}>&laquo; Previous</button> &nbsp;&nbsp;
                            <button className="next round" onClick={this.gotoNext}>Next &raquo;</button>
                        </div>
                    </div>
                    <div className="card-body">
                        {this.state?.isLoaded ? <CalendarTrayComponent data={this.state} onDateClick={this.updateSelectedDate}></CalendarTrayComponent> : ''}
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-warning btn-sm float-right" onClick={this.today}>Today</button>
                    </div>
                </div>
                <span className="span">Selected Date: {this.state?.selectedDate}</span>
            </>
        );
    }
}