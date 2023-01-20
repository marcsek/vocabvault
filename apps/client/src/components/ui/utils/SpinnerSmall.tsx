const SpinnerSmall = () => {
  return (
    <div role="status">
      <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.5198 2.46924C12.3774 2.80012 13.1615 3.29669 13.8272 3.93058C14.4929 4.56448 15.0273 5.3233 15.3998 6.16371C15.7722 7.00412 15.9755 7.90967 15.998 8.82865C16.0206 9.74762 15.8618 10.662 15.531 11.5197C15.2001 12.3773 14.7035 13.1614 14.0696 13.8271C13.4357 14.4928 12.6769 15.0272 11.8365 15.3997C10.9961 15.7721 10.0905 15.9754 9.17154 15.9979C8.25257 16.0205 7.33816 15.8617 6.48052 15.5309C5.62288 15.2 4.83881 14.7034 4.17308 14.0695C3.50735 13.4356 2.97299 12.6768 2.60052 11.8364C2.22805 10.996 2.02475 10.0904 2.00224 9.17145C1.97973 8.25247 2.13845 7.33806 2.46933 6.48042C2.80022 5.62278 3.29678 4.83871 3.93068 4.17298C4.56458 3.50725 5.3234 2.97289 6.16381 2.60042C7.00422 2.22795 7.90977 2.02465 8.82874 2.00215C9.74772 1.97964 10.6621 2.13835 11.5198 2.46924L11.5198 2.46924Z"
          stroke="#D4D4D4"
          strokeOpacity="0.33"
          strokeWidth="2.33333"
        />
        <path
          d="M11.5198 2.46924C12.8989 3.00133 14.0743 3.95638 14.8773 5.19751C15.6803 6.43864 16.0698 7.90213 15.9899 9.37822"
          stroke="#D4D4D4"
          strokeOpacity="0.66"
          strokeWidth="2.33333"
          strokeLinecap="round"
        />
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerSmall;
