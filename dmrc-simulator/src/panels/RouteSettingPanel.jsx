function RouteSettingPanel({
    routes,
    onRouteSelect
  }) {
  
    return (
  
      <div>
  
        <h3>
          Route Setting
        </h3>
  
        <select
          onChange={(e) =>
            onRouteSelect(
              Number(e.target.value)
            )
          }
        >
  
          <option value="">
            Select Route
          </option>
  
          {routes.map(route => (
  
            <option
              key={route.id}
              value={route.id}
            >
              {route.routeName}
            </option>
  
          ))}
  
        </select>
  
      </div>
  
    );
  
}
  
export default RouteSettingPanel;