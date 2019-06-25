<template>
    <div id="app">
        <FdShell>
            <FdShellHeader>
                <FdShellBar>
                    <FdShellBarGroup position="start">
                    <FdShellBarProduct>
                        <FdShellBarProductMenu>
                            <template slot="title">Budget Tool</template>
                            <template slot="menu">
                                <FdMenuItem><router-link to="/">Home</router-link></FdMenuItem>
                            </template>
                        </FdShellBarProductMenu>
                    </FdShellBarProduct>
                    </FdShellBarGroup>
                    <FdShellBarGroup position="end">
                    <FdShellBarActions>
                        <FdShellBarAction>
                        <FdShellBarUserMenu>
                        </FdShellBarUserMenu>
                        </FdShellBarAction>
                        <FdShellBarAction>
                        <FdShellBarProductSwitcher>
                            <FdShellBarProductSwitcherItem>
                            </FdShellBarProductSwitcherItem>
                            <FdShellBarProductSwitcherItem>
                            </FdShellBarProductSwitcherItem>
                        </FdShellBarProductSwitcher>
                        </FdShellBarAction>
                    </FdShellBarActions>
                    </FdShellBarGroup>
                </FdShellBar>
            </FdShellHeader>

            <FdAppMain>

                <router-view></router-view>

            </FdAppMain>
        </FdShell>    
    </div>
</template>

<style>
.content {
    padding: 10px 10px 10px 10px;
}
</style>



